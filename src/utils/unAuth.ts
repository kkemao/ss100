export function NoAuth(
  target: object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor,
) {
  Reflect.defineMetadata('authorized', true, descriptor.value);

  return descriptor;
}
