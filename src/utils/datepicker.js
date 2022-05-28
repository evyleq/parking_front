import {
  registerLocale,
  setDefaultLocale,
  default as DatePicker,
} from 'react-datepicker';
import ru from 'date-fns/locale/ru';
registerLocale('ru', ru);
setDefaultLocale('ru');

export default DatePicker;
