var options: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
};
export const getLocaleDate = (
  timestamp: number,
  locale?: Intl.LocalesArgument,
): string => {
  try {
    const localeDate: string = new Date(timestamp).toLocaleString(
      locale ?? 'en-US',
      options,
    );
    return localeDate;
  } catch (e) {
    console.warn('Error while parsing date!', e.toString());
    return '';
  }
};
