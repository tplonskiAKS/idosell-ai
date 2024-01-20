export class Chunker {
    public static *chunk(row: Record<string, string>, chunkSize: number) {
        const data = [];
        data.push(row);

        if (data.length === chunkSize) {
            yield data
        }

        if (!row) {
            yield data;
            return null;
        }
    }
}