"""API functions to generate spectrograms."""
from pathlib import Path

import numpy as np
from soundevent import audio

import whombat.api.audio as audio_api
from whombat import schemas
from whombat.core import spectrograms as func

__all__ = [
    "compute_spectrogram",
]


def compute_spectrogram(
    recording: schemas.Recording,
    start_time: float,
    end_time: float,
    audio_parameters: schemas.AudioParameters,
    spectrogram_parameters: schemas.SpectrogramParameters,
    audio_dir: Path = Path.cwd(),
) -> np.ndarray:
    """Compute a spectrogram for a recording.

    Parameters
    ----------
    recording
        The recording to compute the spectrogram for.
    start_time
        Start time in seconds.
    end_time
        End time in seconds.
    audio_dir
        The directory where the audio files are stored.
    spectrogram_parameters : SpectrogramParameters
        Spectrogram parameters.

    Returns
    -------
    DataArray
        Spectrogram image.

    """
    wav = audio_api.load_audio(
        recording,
        start_time,
        end_time,
        audio_parameters=audio_parameters,
        audio_dir=audio_dir,
    )

    # Select channel. Do this early to avoid unnecessary computation.
    wav = wav[dict(channel=[spectrogram_parameters.channel])]

    spectrogram = audio.compute_spectrogram(
        wav,
        window_size=spectrogram_parameters.window_size,
        hop_size=spectrogram_parameters.hop_size,
        window_type=spectrogram_parameters.window,
    )

    # De-noise spectrogram with PCEN
    if spectrogram_parameters.pcen:
        # NOTE: PCEN expects a spectrogram in amplitude scale so it should be
        # applied before scaling.
        spectrogram = func.pcen(spectrogram)

    # Get the underlying numpy array.
    array = spectrogram.data

    if spectrogram_parameters.normalize:
        array = func.normalize_array(array)

    # Scale spectrogram.
    array = func.scale_spectrogram(array, spectrogram_parameters.scale)

    # Clamp amplitude.
    if spectrogram_parameters.clamp:
        array = func.clamp_amplitude(
            array,
            spectrogram_parameters.min_dB,
            spectrogram_parameters.max_dB,
            spectrogram_parameters.scale,
        )

    # Remove unncecessary dimensions.
    return array.squeeze()