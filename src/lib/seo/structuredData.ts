export function getPersonSchema(locale: string) {
  const name = 'Nguyen Quoc Khanh';
  const role = locale === 'vi' ? 'Lập trình viên Fullstack hướng Backend' : 'Backend-focused Fullstack Developer';
  const desc = locale === 'vi' 
    ? 'Chuyên gia thiết kế và xây dựng các hệ thống bảo mật, có thể mở rộng và dễ bảo trì bằng các công nghệ backend hiện đại.' 
    : 'Specialist in building secure, scalable, and maintainable systems using modern backend technologies.';

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle: role,
    description: desc,
    url: 'https://nkhanh0908.github.io',
    sameAs: [
      'https://github.com/NKhanh0908',
      'https://www.linkedin.com/in/khanh-nguyen-quoc-13110a324',
    ],
    knowsAbout: [
      'Software Engineering',
      'Java',
      'Spring Boot',
      'Spring Security',
      'Redis',
      'PostgreSQL',
      'WebSocket',
      'Docker',
      'React',
      'TypeScript'
    ]
  };
}
