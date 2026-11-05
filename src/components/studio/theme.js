import { applyTheme } from '@cloudscape-design/components/theming';

let applied = false;

/**
 * Gắn bảng màu của Sạp 122 vào Cloudscape Design System.
 * Chỉ chạy một lần, phía client, để không phá render phía server.
 */
export function applyStudioTheme() {
  if (applied || typeof window === 'undefined') return;
  applied = true;

  applyTheme({
    theme: {
      tokens: {
        fontFamilyBase: "'Be Vietnam Pro', system-ui, -apple-system, sans-serif",
        fontFamilyMonospace: "'IBM Plex Mono', ui-monospace, monospace",
        colorBackgroundLayoutMain: '#f7f4ec',
        colorBackgroundHomeHeader: '#12352a',
        colorBackgroundContainerContent: '#fffdf7',
        colorBackgroundContainerHeader: '#fbf7ee',
        colorBackgroundButtonPrimaryDefault: '#12352a',
        colorBackgroundButtonPrimaryHover: '#1e5c46',
        colorBackgroundButtonPrimaryActive: '#0c2a20',
        colorTextAccent: '#8a6114',
        colorTextHeadingDefault: '#141a16',
        colorTextBodyDefault: '#2b332d',
        colorBorderDividerDefault: '#e2dbcb',
        borderRadiusContainer: '12px',
        borderRadiusButton: '8px',
      },
    },
  });
}
