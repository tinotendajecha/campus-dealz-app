import crypto from 'crypto';


export const hashservice = (data: string) => {
  // Create a hash object
  const hash = crypto.createHash("sha256");

  // Hash the data
  hash.update(data);

  // Generate the hash digest
  return hash.digest("hex");
};