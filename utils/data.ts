export function uniqueEmail(label: string = 'user'): string {
  const timestamp = Date.now();
  return `${label}.${timestamp}@example.com`;
}

export function registrationData(overrides: Partial<{
  name: string;
  email: string;
  password: string;
}> = {}) {
  return {
    name: overrides.name ?? 'Playwright User',
    email: overrides.email ?? uniqueEmail('playwright'),
    password: overrides.password ?? 'P@ssw0rd123!',
    firstName: 'Playwright',
    lastName: 'Tester',
    address: '123 Test Street',
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    zipcode: '90001',
    mobile: '5551234567',
  };
}
