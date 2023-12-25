import { formatDistanceToNow } from 'date-fns';


export function postedTime(time)
{
    time = +time
// Your timestamp from the server (make sure it's in a format that date-fns can parse)
const timestampFromServer = new Date(time);

// Format the difference as a relative time string
const relativeTime = formatDistanceToNow(timestampFromServer, { addSuffix: true });

// Output the relative time
console.log("from fun ",relativeTime)
return relativeTime;
}