/**
 * Normalize Integrated GraphQL ComponentQuery results into classic field shapes
 * used by LPGA list components (SectionTitle + items[]).
 */

type JsonField = { jsonValue?: unknown };

type GqlChild = Record<string, JsonField | string | undefined> & { id?: string };

type GqlDatasource = Record<string, unknown> & {
  children?: { results?: GqlChild[] };
};

const asField = (node: unknown) => {
  if (!node || typeof node !== 'object') return undefined;
  const jsonValue = (node as JsonField).jsonValue;
  return jsonValue !== undefined ? jsonValue : node;
};

export function normalizeLpgaListFields<TParent extends Record<string, unknown>>(
  fields: unknown,
  parentMap: Record<keyof TParent & string, string>,
  childMap: Record<string, string>
): TParent & { items: Array<{ name: string; url: string; fields: Record<string, unknown> }> } {
  const raw = (fields || {}) as Record<string, unknown>;

  // Classic layout service shape already has PascalCase parent fields / items
  const looksClassic = Object.keys(parentMap).some((key) => key in raw) || Array.isArray(raw.items);
  if (looksClassic) {
    return {
      ...(raw as TParent),
      items: Array.isArray(raw.items) ? (raw.items as Array<{ name: string; url: string; fields: Record<string, unknown> }>) : [],
    };
  }

  const ds = ((raw.data as { datasource?: GqlDatasource } | undefined)?.datasource ||
    raw.datasource ||
    {}) as GqlDatasource;

  const parent: Record<string, unknown> = {};
  for (const [pascal, camel] of Object.entries(parentMap)) {
    parent[pascal] = asField(ds[camel]);
  }

  const results = ds.children?.results || [];
  const items = results.map((child, index) => {
    const childFields: Record<string, unknown> = {};
    for (const [pascal, camel] of Object.entries(childMap)) {
      childFields[pascal] = asField(child[camel]);
    }
    const id = typeof child.id === 'string' ? child.id : `child-${index}`;
    return { name: id, url: id, fields: childFields };
  });

  return { ...(parent as TParent), items };
}
