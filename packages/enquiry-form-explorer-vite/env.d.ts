/// <reference types="vite/client" />
enum Sites {
  explorer = 'EXPLORER',
  stattravel = 'STATTRAVEL'
}

interface ImportMetaEnv {
  VITE_ENQUIRY_PAGE_FORMSPARK: string; // Test: eSmarY3i
  VITE_NEWSLETTER_PAGE_FORMSPARK: string; // Test: eSmarY3i
  VITE_NEWSLETTER_FORM_FORMSPARK: string; // Test: eSmarY3i
  VITE_SITE: Sites;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
