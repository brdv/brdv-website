/**
 * Calculate reading time for a given text
 * @param text - The text content to analyze
 * @param wordsPerMinute - Average reading speed (default: 200 words per minute)
 * @returns Reading time in minutes
 */
export function calculateReadingTime(text: string, wordsPerMinute: number = 200): number {
  // Remove markdown syntax and HTML tags for more accurate word count
  const cleanText = text
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/#{1,6}\s/g, '') // Remove heading markers
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links but keep text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[*_~]/g, ''); // Remove emphasis markers

  // Count words
  const words = cleanText.trim().split(/\s+/).length;
  
  // Calculate reading time in minutes (minimum 1 minute)
  const minutes = Math.ceil(words / wordsPerMinute);
  
  return Math.max(1, minutes);
}

/**
 * Format reading time as a human-readable string
 * @param minutes - Reading time in minutes
 * @returns Formatted string like "5 min read"
 */
export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}

