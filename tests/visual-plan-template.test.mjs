import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";

const templateUrl = new URL(
  "../skills/visual-plan/assets/interactive-plan.html",
  import.meta.url,
);

function loadTemplate() {
  return readFileSync(templateUrl, "utf8");
}

function parseTransform(value) {
  const match = value.match(
    /^translate\((-?[\d.]+) (-?[\d.]+)\) scale\(([\d.]+)\)$/,
  );
  assert.ok(match, `unexpected scene transform: ${value}`);
  return {
    x: Number(match[1]),
    y: Number(match[2]),
    scale: Number(match[3]),
  };
}

function runTemplateScript(html) {
  const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
  assert.ok(script, "template must contain an inline script");

  const elements = new Map();
  const element = (id) => {
    if (!elements.has(id)) {
      const listeners = new Map();
      const attributes = new Map();
      elements.set(id, {
        id,
        listeners,
        attributes,
        textContent: "",
        addEventListener(type, handler) {
          listeners.set(type, handler);
        },
        setAttribute(name, value) {
          attributes.set(name, String(value));
        },
        getAttribute(name) {
          return attributes.get(name);
        },
        getBoundingClientRect() {
          return { left: 0, top: 0, width: 1200, height: 800 };
        },
        getBBox() {
          return { x: 100, y: 100, width: 1400, height: 700 };
        },
        setPointerCapture() {},
        releasePointerCapture() {},
      });
    }
    return elements.get(id);
  };

  const context = vm.createContext({
    console,
    document: { getElementById: element },
    requestAnimationFrame(callback) {
      callback();
    },
  });
  vm.runInContext(script, context);
  return { element };
}

test("template is a standalone interactive SVG document", () => {
  const html = loadTemplate();

  assert.match(html, /^<!doctype html>/i);
  assert.match(html, /<svg[^>]+id="diagram"/);
  assert.match(html, /<g[^>]+id="scene"/);
  assert.match(html, /id="zoom-in"/);
  assert.match(html, /id="zoom-out"/);
  assert.match(html, /id="reset-view"/);
  assert.doesNotMatch(html, /(?:src|href)="https?:\/\//i);
});

test("template pans with pointer movement and zooms around the cursor", () => {
  const { element } = runTemplateScript(loadTemplate());
  const viewport = element("viewport");
  const scene = element("scene");

  const beforePan = parseTransform(scene.getAttribute("transform"));
  viewport.listeners.get("pointerdown")({
    button: 0,
    pointerId: 7,
    clientX: 300,
    clientY: 250,
  });
  viewport.listeners.get("pointermove")({
    pointerId: 7,
    clientX: 345,
    clientY: 280,
  });
  const afterPan = parseTransform(scene.getAttribute("transform"));

  assert.equal(afterPan.x, beforePan.x + 45);
  assert.equal(afterPan.y, beforePan.y + 30);

  viewport.listeners.get("wheel")({
    clientX: 600,
    clientY: 400,
    deltaY: -100,
    preventDefault() {},
  });
  const afterZoom = parseTransform(scene.getAttribute("transform"));

  assert.ok(afterZoom.scale > afterPan.scale);
  assert.notEqual(afterZoom.x, afterPan.x);
  assert.notEqual(afterZoom.y, afterPan.y);
});
