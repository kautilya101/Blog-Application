import moment from "moment";

export function nameInitials(name:string):string{
  let initials = '';
  const breakName = name.split(' ');
  initials = breakName.reduce((acc,curr) => {
      acc += curr[0].toUpperCase()
      return acc;
  },'')
  return initials;
}

export function formatDate(dateString: Date) {
  return moment(dateString).format('D/MM/YYYY');
}

export function formatTime(dateString: Date) {
  return moment(dateString).format('HH:mm');
}