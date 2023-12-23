export function epochToDate(epoch: number): Date {
    let d = new Date(0);
    d.setUTCSeconds(epoch);
    return d;
}