import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ command }) => {
  // Default build/dev base is "/".
  // For GitHub Pages we build with BASE_PATH="/qp-site/" (set in CI workflow).
  const base = process.env.BASE_PATH || '/';

  return {
    base,
  plugins: [react()],
  server: {
    port: 5173
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        page1: resolve(__dirname, 'page1.html'),
        blog: resolve(__dirname, 'blog.html'),
        blog_china_to_ru_scheme: resolve(__dirname, 'blog-china-to-ru-scheme.html'),
        blog_multimodal_door_to_door: resolve(__dirname, 'blog-multimodal-door-to-door.html'),
        blog_customs_clearance_docs: resolve(__dirname, 'blog-customs-clearance-docs.html'),
        blog_rail_express_when_beneficial: resolve(__dirname, 'blog-rail-express-when-beneficial.html'),
        blog_marketplace_crossborder_logistics: resolve(__dirname, 'blog-marketplace-crossborder-logistics.html'),
        blog_valuable_cargo_security: resolve(__dirname, 'blog-valuable-cargo-security.html'),
        blog_consolidation_split_shipments: resolve(__dirname, 'blog-consolidation-split-shipments.html'),
        blog_china_supplier_control: resolve(__dirname, 'blog-china-supplier-control.html'),
        blog_first_last_mile: resolve(__dirname, 'blog-first-last-mile.html'),
        blog_delivery_time_sla: resolve(__dirname, 'blog-delivery-time-sla.html'),
        blog_incoterms_import_guide: resolve(__dirname, 'blog-incoterms-import-guide.html'),
        blog_customs_cost_mistakes: resolve(__dirname, 'blog-customs-cost-mistakes.html')
      }
    }
  }
  };
});


