type AnalyticsValue = string | number | boolean;
type AnalyticsParams = Record<string, AnalyticsValue | undefined>;

declare global {
  interface Window {
    dataLayer: unknown[][];
    gtag: (...args: unknown[]) => void;
  }
}

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
let initialized = false;

function getControlId(element: HTMLElement) {
  const explicitId = element.dataset.analyticsId;
  if (explicitId) return explicitId;

  const ariaLabel = element.getAttribute('aria-label');
  if (ariaLabel) return ariaLabel;

  return element.textContent?.replace(/\s+/g, ' ').trim().slice(0, 80) || element.tagName.toLowerCase();
}

export function initAnalytics() {
  if (!measurementId || initialized) return;
  initialized = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => window.dataLayer.push(args);
  window.gtag('js', new Date());
  window.gtag('config', measurementId, { send_page_view: false });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);

  document.addEventListener('click', event => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const control = target.closest<HTMLElement>('button, a, [role="button"], [role="option"]');
    if (!control) return;

    trackEvent('ui_click', {
      control_id: getControlId(control),
      control_type: control.tagName.toLowerCase(),
      screen: document.body.dataset.screen,
    });
  }, true);
}

export function trackEvent(name: string, params: AnalyticsParams = {}) {
  if (!measurementId) return;
  if (!initialized) initAnalytics();

  const cleanParams = Object.fromEntries(
    Object.entries(params).filter((entry): entry is [string, AnalyticsValue] => entry[1] !== undefined),
  );

  window.gtag('event', name, cleanParams);
}