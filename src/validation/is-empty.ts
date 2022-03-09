export default function isEmpty(value: any) {
  let result: boolean = false;
  if (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  )
    result = true;
  return result;
}
