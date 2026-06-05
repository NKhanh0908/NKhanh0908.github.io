export function formatDate(dateString: string, locale: string = 'en'): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;
    }
    return date.toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US', {
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}
