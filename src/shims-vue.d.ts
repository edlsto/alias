declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "*.svg?inline" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any;
  export default content;
}
