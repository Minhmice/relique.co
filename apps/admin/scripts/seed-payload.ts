/**
 * Seed script to migrate data from mocks to Payload CMS
 * Run with: npx tsx scripts/seed-payload.ts
 */

import { getPayload } from 'payload';
import config from '../payload.config';
import postsData from '../../web/src/mocks/posts.json';

// Hardcoded testimonials from TestimonialsSection
const testimonialsData = [
  {
    name: "Jonathan Reeves",
    role: "Private Collector",
    quote: "The AI forensic score gave me the confidence to acquire a piece I've been tracking for years. Relique's standard is unmatched.",
    rating: 5,
    verified: true,
    order: 0,
  },
  {
    name: "Elena Petrov",
    role: "Sports Historian",
    quote: "Finally, a platform that treats sports memorabilia with the same academic and financial rigor as fine art.",
    rating: 5,
    verified: true,
    order: 1,
  },
  {
    name: "Marcus Thorne",
    role: "Asset Manager",
    quote: "Integrating Relique's authenticated items into my client's alternative portfolio was seamless. Pure transparency.",
    rating: 5,
    verified: true,
    order: 2,
  },
];

// Hardcoded team data from TeamSection
const teamData = [
  {
    name: "Do Tuan Kiet",
    role: "Co-founder & Head of SEA Operations",
    subtitle: "Financial Analyst & Business Consultant at Wander Wealth Partner",
    description: "Leads operations across Southeast Asia. Bringing extensive experience in capital management and risk assessment to Relique's strategies.",
    order: 0,
  },
  {
    name: "Vu Truong Son",
    role: "St. B Ecosystem Founder & Director",
    subtitle: "Msc Applied A.I at SWISS UMEF University",
    description: "Founder of St. B Sporting Ecosystem. Powers Relique's AI authentication tech with a Master's in Applied AI and international finance expertise.",
    order: 1,
  },
  {
    name: "Doan Trung Phong",
    role: "Head of St.B AI",
    subtitle: "AI Engineer at VNPAY; Ex Manager at Thang Long University",
    description: "Invaluable technical expertise in Deep Learning. Previously mind behind transaction fraud detectors for \"big 4\" commercial banks.",
    order: 2,
  },
  {
    name: "Trinh Duc Tan",
    role: "AI Engineer",
    subtitle: "AI Engineer at TDMK Ltd.",
    description: "Key technical contributor focusing on multi-layered signature comparison and pattern variance assessment.",
    order: 3,
  },
  {
    name: "Nguyen Huy Manh",
    role: "AI Engineer",
    subtitle: "AI Engineer at Pixta Vietnam",
    description: "Expert in computer vision integration for forensic material analysis and data-driven authenticity metrics.",
    order: 4,
  },
];

async function seedPayload() {
  console.log('Starting Payload CMS seeding...');

  try {
    const payload = await getPayload({ config });

    // Seed Posts
    console.log('Seeding posts...');
    for (const post of postsData as any[]) {
      try {
        await payload.create({
          collection: 'posts',
          data: {
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            author: post.author || 'Relique Team',
            tags: post.tags?.map((tag: string) => ({ tag })) || [],
            featured: post.featured || false,
            status: 'published',
            publishedAt: post.publishedAt || post.createdAt,
          },
        });
        console.log(`✓ Created post: ${post.title}`);
      } catch (error: any) {
        if (error.message?.includes('duplicate') || error.message?.includes('unique')) {
          console.log(`- Post already exists: ${post.title}`);
        } else {
          console.error(`✗ Failed to create post ${post.title}:`, error.message);
        }
      }
    }

    // Seed Testimonials
    console.log('\nSeeding testimonials...');
    for (const testimonial of testimonialsData) {
      try {
        await payload.create({
          collection: 'testimonials',
          data: testimonial,
        });
        console.log(`✓ Created testimonial: ${testimonial.name}`);
      } catch (error: any) {
        if (error.message?.includes('duplicate') || error.message?.includes('unique')) {
          console.log(`- Testimonial already exists: ${testimonial.name}`);
        } else {
          console.error(`✗ Failed to create testimonial ${testimonial.name}:`, error.message);
        }
      }
    }

    // Seed Team
    console.log('\nSeeding team members...');
    for (const member of teamData) {
      try {
        await payload.create({
          collection: 'team',
          data: member,
        });
        console.log(`✓ Created team member: ${member.name}`);
      } catch (error: any) {
        if (error.message?.includes('duplicate') || error.message?.includes('unique')) {
          console.log(`- Team member already exists: ${member.name}`);
        } else {
          console.error(`✗ Failed to create team member ${member.name}:`, error.message);
        }
      }
    }

    console.log('\n✓ Seeding completed successfully!');
  } catch (error) {
    console.error('✗ Seeding failed:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  seedPayload()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export { seedPayload };
