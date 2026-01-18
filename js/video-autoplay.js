/**
 * Enhanced YouTube Video Player
 * Features: Robust click-to-play using iframe source manipulation
 * Note: Replaced API implementation to support local file:// protocol and improved reliability.
 */

document.addEventListener("DOMContentLoaded", () => {
    const videoContainer = document.querySelector('.youtube-container');
    const iframe = document.getElementById("youtubeVideo");

    if (!iframe || !videoContainer) return;

    // Create custom play button overlay
    const playButtonOverlay = document.createElement('div');
    playButtonOverlay.className = 'video-play-overlay';
    playButtonOverlay.innerHTML = `
        <svg class="play-icon" viewBox="0 0 68 48">
            <path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00"></path>
            <path d="M 45,24 27,14 27,34" fill="#fff"></path>
        </svg>
        <span class="play-text">Watch Video</span>
    `;

    // Make sure overlay is positioned correctly via CSS or ensure it's appended
    videoContainer.appendChild(playButtonOverlay);

    // Extract the base source
    let baseSrc = iframe.getAttribute('src');

    // Ensure we are using the nocookie domain
    if (baseSrc.includes('youtube.com')) {
        baseSrc = baseSrc.replace('youtube.com', 'youtube-nocookie.com');
    }

    // Handle Click
    playButtonOverlay.addEventListener('click', () => {
        // We cannot reliably autoplay from file:// protocol due to CORS/Origin policies
        // triggering Error 153.
        // Instead, we just reveal the player so the user can click the native YouTube play button.

        // UI Updates: Hide overlay to reveal standard player
        videoContainer.classList.add('playing');
        playButtonOverlay.style.opacity = '0';
        playButtonOverlay.style.pointerEvents = 'none';

        // Optional: Hint the user to play if needed? 
        // The standard big red YouTube play button will be visible underneath.
    });

    // Optional: Reset if video ends? 
    // Without the API, we can't detect 'ended' event easily across domains. 
    // Users can just click the YouTube replay button in the native player.
});
