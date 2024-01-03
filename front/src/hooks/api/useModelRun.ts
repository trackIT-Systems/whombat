import api from "@/app/api";
import useObject from "@/hooks/utils/useObject";

import type { ModelRunUpdate } from "@/api/model_runs";
import type { ModelRun } from "@/types";
import type { AxiosError } from "axios";

export default function useModelRun({
  uuid,
  modelRun,
  enabled = true,
  onUpdate,
  onDelete,
  onError,
}: {
  uuid?: string;
  modelRun?: ModelRun;
  enabled?: boolean;
  withState?: boolean;
  onUpdate?: (updated: ModelRun) => void;
  onDelete?: (deleted: ModelRun) => void;
  onError?: (error: AxiosError) => void;
}) {
  if (modelRun !== undefined && modelRun.uuid !== uuid) {
    throw new Error("Model Run uuid does not match");
  }

  const { query, useMutation, useDestruction } = useObject<ModelRun>({
    uuid,
    initial: modelRun,
    name: "model_run",
    enabled,
    getFn: api.modelRuns.get,
    onError,
  });

  const update = useMutation<ModelRunUpdate>({
    mutationFn: api.modelRuns.update,
    onSuccess: onUpdate,
  });

  const delete_ = useDestruction({
    mutationFn: api.modelRuns.delete,
    onSuccess: onDelete,
  });

  return {
    ...query,
    update,
    delete: delete_,
  };
}
