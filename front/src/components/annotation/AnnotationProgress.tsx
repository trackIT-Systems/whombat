import { useMemo } from "react";

import Button, { getButtonClassName } from "@/components/Button";
import FilterBar from "@/components/filters/FilterBar";
import FilterMenu from "@/components/filters/FilterMenu";
import taskFilterDefs from "@/components/filters/tasks";
import { FilterIcon, NextIcon, PreviousIcon } from "@/components/icons";
import Toggle from "@/components/inputs/Toggle";
import ProgressBar from "@/components/ProgressBar";
import Tooltip from "@/components/Tooltip";
import { computeAnnotationTasksProgress } from "@/utils/annotation_tasks";

import type { AnnotationTaskFilter } from "@/api/annotation_tasks";
import type { Filter } from "@/hooks/utils/useFilter";
import type { AnnotationTask } from "@/types";

export default function AnnotationProgress({
  tasks,
  filter,
  onNext,
  onPrevious,
}: {
  tasks: AnnotationTask[];
  filter: Filter<AnnotationTaskFilter>;
  onNext?: () => void;
  onPrevious?: () => void;
}) {
  const { missing: pending, completed: complete } = useMemo(
    () => computeAnnotationTasksProgress(tasks),
    [tasks],
  );

  return (
    <div className="inline-flex gap-1 items-center h-full w-full">
      <Tooltip tooltip="Previous Task" placement="bottom">
        <Button mode="text" padding="p-1" onClick={onPrevious}>
          <PreviousIcon className="inline-block w-8 h-8" />
        </Button>
      </Tooltip>
      <div className="inline-flex gap-4 items-center px-2 h-full rounded-lg border grow dark:border-stone-800">
        <div className="inline-flex gap-1 items-center">
          <span className="text-sm text-stone-500">Progress:</span>
          <div className="w-36">
            <ProgressBar
              total={pending + complete}
              complete={complete}
              className="mb-0"
            />
          </div>
        </div>
        <span className="text-sm align-middle whitespace-nowrap text-stone-500">
          Remaining:{" "}
          <span className="font-medium text-blue-500">{pending}</span>
        </span>
        <div className="inline-flex gap-1 items-center">
          <span className="text-sm text-stone-500">Pending:</span>
          <Toggle
            label="Only Pending"
            isSelected={filter.get("pending") ?? false}
            onChange={(checked) => {
              if (checked) {
                filter.set("pending", checked, true);
              } else {
                filter.clear("pending", true);
              }
            }}
          />
        </div>
        <FilterMenu
          filter={filter}
          filterDefs={taskFilterDefs}
          className={getButtonClassName({
            variant: "info",
            mode: "text",
            padding: "p-1",
          })}
          button={
            <>
              <FilterIcon className="inline-block mr-1 w-5 h-5" />
              <span className="text-sm align-middle whitespace-nowrap">
                Filters
              </span>
            </>
          }
        />
        <div className="overflow-x-scroll">
          <FilterBar withLabel={false} filter={filter} />
        </div>
      </div>
      <Tooltip tooltip="Next Task" placement="bottom">
        <Button mode="text" padding="p-1" onClick={onNext}>
          <NextIcon className="inline-block w-8 h-8" />
        </Button>
      </Tooltip>
    </div>
  );
}
