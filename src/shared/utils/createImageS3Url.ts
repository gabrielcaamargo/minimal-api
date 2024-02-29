export function createImageS3Url(bucket: string, key: string) {
  const region = process.env.AWS_REGION;
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}
