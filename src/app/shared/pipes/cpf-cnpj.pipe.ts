import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfCnpj'
})
export class CpfCnpjPipe implements PipeTransform {
  transform(value: string | number): string {
    if (!value) return '';
    
    // Remove any non-digit character
    const numericValue = value.toString().replace(/\D/g, '');

    // Format based on length
    if (numericValue.length === 11) {
      // CPF: 000.000.000-00
      return numericValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
    } else if (numericValue.length === 14) {
      // CNPJ: 00.000.000/0000-00
      return numericValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5');
    }

    // Return original value if it doesn't match CPF or CNPJ length
    return numericValue;
  }
}
