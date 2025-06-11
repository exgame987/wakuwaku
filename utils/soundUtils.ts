
/**
 * Plays a sound effect from the given file path.
 * @param soundFile The path to the sound file (e.g., '/sounds/my-sound.mp3').
 *                  Assumes files are in the public/sounds/ directory.
 */
export const playSound = (soundFile: string): void => {
  try {
    const audio = new Audio(soundFile);
    audio.play().catch(error => {
      // Autoplay restrictions might prevent sound from playing without user interaction.
      // Or the file might not exist.
      console.warn(`Could not play sound: ${soundFile}`, error);
    });
  } catch (error) {
    console.error(`Error initializing sound: ${soundFile}`, error);
  }
};
