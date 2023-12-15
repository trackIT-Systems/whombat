import { type ClipAnnotationFilter } from "@/api/clip_annotations";
import api from "@/app/api";
import usePagedQuery from "@/hooks/api/usePagedQuery";
import useFilter from "@/hooks/api/useFilter";

const _empty: ClipAnnotationFilter = {};
const _fixed: (keyof ClipAnnotationFilter)[] = [];

export default function useClipAnnotations({
  filter: initialFilter = _empty,
  fixed = _fixed,
  pageSize = 10,
  enabled = true,
}: {
  filter?: ClipAnnotationFilter;
  fixed?: (keyof ClipAnnotationFilter)[];
  pageSize?: number;
  enabled?: boolean;
} = {}) {
  const filter = useFilter<ClipAnnotationFilter>({
    defaults: initialFilter,
    fixed,
  });

  const { query, pagination, items, total } = usePagedQuery({
    name: "clip_annotations",
    func: api.clipAnnotations.getMany,
    pageSize: pageSize,
    filter: filter.filter,
    enabled,
  });

  return {
    ...query,
    filter,
    pagination,
    items,
    total,
  } as const;
}
