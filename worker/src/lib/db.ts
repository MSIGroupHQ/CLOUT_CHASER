export async function firstRow<T>(statement: D1PreparedStatement): Promise<T | null> {
  return statement.first<T>();
}
