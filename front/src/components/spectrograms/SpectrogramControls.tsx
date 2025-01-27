import Button from "@/components/Button";
import { BackIcon, LockClosedIcon, LockOpenIcon, SearchIcon } from "@/components/icons";
import Tooltip from "@/components/Tooltip";
import KeyboardKey from "@/components/KeyboardKey";
import { LOCK_ASPECT_RATIO_SHORTCUT, ZOOM_SHORTCUT, RESET_ZOOM_SHORTCUT } from "@/utils/keyboard";

export default function SpectrogramControls({
  canZoom,
  fixedAspectRatio,
  onZoom,
  onReset,
  onToggleAspectRatio,
}: {
  canZoom: boolean;
  fixedAspectRatio: boolean;
  onReset?: () => void;
  onZoom?: () => void;
  onToggleAspectRatio?: () => void;
}) {
  return (
    <div className="flex space-x-2">
      <Tooltip
        tooltip={
          <div className="inline-flex gap-2 items-center">
            Fixed aspect ratio
            <div className="text-xs">
              <KeyboardKey code={LOCK_ASPECT_RATIO_SHORTCUT} />
            </div>
          </div>
        }
        placement="bottom"
      >
        <Button
          variant={fixedAspectRatio ? "primary" : "secondary"}
          onClick={onToggleAspectRatio}
        >
          {fixedAspectRatio ? (
            <LockClosedIcon className="w-5 h-5" />
          ) : (
            <LockOpenIcon className="w-5 h-5" />
          )}
        </Button>
      </Tooltip>
      <Tooltip
        tooltip={
          <div className="inline-flex gap-2 items-center">
            Zoom to selection
            <div className="text-xs">
              <KeyboardKey code={ZOOM_SHORTCUT} />
            </div>
          </div>
        }
        placement="bottom"
      >
        <Button variant={canZoom ? "primary" : "secondary"} onClick={onZoom}>
          <SearchIcon className="w-5 h-5" />
        </Button>
      </Tooltip>
      <Tooltip
        tooltip={
          <div className="inline-flex gap-2 items-center">
            Reset zoom
            <div className="text-xs">
              <KeyboardKey code={RESET_ZOOM_SHORTCUT} />
            </div>
          </div>
        }
        placement="bottom"
      >
        <Button variant="secondary" onClick={onReset}>
          <BackIcon className="w-5 h-5" />
        </Button>
      </Tooltip>
    </div>
  );
}
