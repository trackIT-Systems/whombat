import { useMutation } from "@tanstack/react-query";

import { type DatasetFilter, type DatasetCreate } from "@/api/datasets";
import api from "@/app/api";
import usePagedQuery from "@/hooks/api/usePagedQuery";
import useFilter from "@/hooks/api/useFilter";

const _empty: DatasetFilter = {};
const _fixed: (keyof DatasetFilter)[] = [];

export default function useDatasets({
  filter: initialFilter = _empty,
  fixed = _fixed,
  pageSize = 10,
  enabled = true,
}: {
  filter?: DatasetFilter;
  fixed?: (keyof DatasetFilter)[];
  pageSize?: number;
  enabled?: boolean;
} = {}) {
  const filter = useFilter<DatasetFilter>({ defaults: initialFilter, fixed });

  const { query, pagination, items, total } = usePagedQuery({
    name: "datasets",
    func: api.datasets.getMany,
    pageSize: pageSize,
    filter: filter.filter,
    enabled,
  });

  const create = useMutation({
    mutationFn: api.datasets.create,
    onSuccess: () => {
      query.refetch();
    },
  });

  return {
    ...query,
    filter,
    pagination,
    items,
    total,
    create,
  } as const;
}
