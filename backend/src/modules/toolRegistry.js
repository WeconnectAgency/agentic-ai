export const tools = {};
export function register_function(name, fn) {
  tools[name] = fn;
}
export function get_function(name) {
  return tools[name];
}
