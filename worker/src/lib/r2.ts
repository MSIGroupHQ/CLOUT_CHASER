export const r2Keys = {
  source(oppHash: string, sourceId: string): string {
    return `sources/${oppHash}/${sourceId}/source.mp4`;
  },
  package(oppHash: string, packageId: string): string {
    return `packages/${oppHash}/${packageId}.json`;
  },
  receipt(oppHash: string, receiptId: string): string {
    return `receipts/public/${oppHash}/${receiptId}.json`;
  },
  share(oppHash: string): string {
    return `share/${oppHash}.json`;
  },
} as const;
