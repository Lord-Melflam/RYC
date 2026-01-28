# Privacy Policy - RYC (Rate Your Courses)

**Last Updated**: January 2026

## Our Commitment to Privacy

RYC (Rate Your Courses) is built with privacy as a fundamental principle, not an afterthought. We believe that honest course reviews require complete anonymity and protection of student privacy.

## Privacy-First Design

### What We Don't Collect

We are proud to say that RYC does NOT collect:

- ❌ User accounts or registration information
- ❌ Email addresses
- ❌ Names or student IDs
- ❌ IP addresses for review submission
- ❌ Tracking cookies (except essential functional cookies)
- ❌ Browser fingerprints
- ❌ Location data
- ❌ Any personally identifiable information (PII)

### What We Do Collect

To provide the service, we collect minimal, non-identifying data:

- ✅ **Course Reviews**: Rating (1-5), difficulty (1-5), workload (1-5), optional comment
- ✅ **Anonymous Identifiers**: Each review gets a cryptographically random ID (e.g., `anon_a3f9e8c7b2d1`) that cannot be traced back to you
- ✅ **Optional Metadata**: Semester and year (if you choose to provide it)
- ✅ **Essential Cookies**: Only for basic site functionality
- ✅ **Aggregated Analytics**: Anonymous, non-identifying usage statistics for service improvement

## How Reviews Work

### Anonymous Submission

1. You visit the site - no login required
2. You select a course and write a review
3. Our system generates a random anonymous ID
4. Your review is submitted without any connection to your identity
5. The review enters moderation queue

### Moderation Process

All reviews go through moderation to maintain quality while preserving anonymity:

1. **Initial Submission**: Review is marked as "PENDING"
2. **Automated Checks**: Content filtering for spam and prohibited content
3. **Community Moderation**: Users can flag inappropriate reviews
4. **Manual Review**: Flagged content is reviewed by moderators
5. **Publication**: Approved reviews are made public

Moderators see only:
- Review content (rating, comment, etc.)
- Anonymous ID
- Submission timestamp
- Flag reasons (if flagged)

They do NOT see:
- Any identifying information about the reviewer
- IP addresses
- Browser information
- Any way to connect reviews to individuals

## Data Security

### Technical Measures

- **Encrypted Connections**: All data transmitted over HTTPS
- **Secure Database**: PostgreSQL with access controls
- **No Cross-Linking**: Anonymous IDs are isolated and cannot be cross-referenced
- **Rate Limiting**: Prevents abuse and data scraping
- **Input Validation**: All inputs are sanitized to prevent attacks
- **Minimal Logging**: System logs do not contain user-identifying information

### Organizational Measures

- **Privacy by Design**: Every feature is built with privacy first
- **Data Minimization**: We only collect what's absolutely necessary
- **Purpose Limitation**: Data is only used for providing the review service
- **Regular Audits**: Periodic reviews of privacy practices

## Your Rights

### Anonymity Means Freedom

Since we don't collect personal information, there's no personal data to:
- Request access to
- Request deletion of
- Request correction of
- Request portability of

However, you can:
- **Flag Reviews**: Report inappropriate content
- **View All Reviews**: All approved reviews are publicly visible
- **Delete Reviews**: While we can't connect reviews to individuals, you can contact us with the review ID if you can prove you submitted it

## Community Moderation

### Flagging System

Users can flag reviews for:
- Spam or promotional content
- Offensive or inappropriate language
- Personal attacks
- Misleading information
- Plagiarism or duplicate content

### Flag Privacy

When you flag a review:
- Your flag is anonymous
- You provide a reason (required)
- Flagged reviews are reviewed by moderators
- Multiple flags on a review trigger additional scrutiny

## Third-Party Services

### What We Use

Currently, RYC uses minimal third-party services:
- **Hosting Provider**: For server infrastructure
- **Database Provider**: For data storage

### What We Don't Use

- ❌ Google Analytics or similar tracking
- ❌ Social media integrations
- ❌ Advertising networks
- ❌ Marketing platforms
- ❌ User behavior tracking

## Data Retention

### Reviews

- Approved reviews are kept indefinitely to help future students
- Rejected reviews are deleted within 90 days
- Flagged reviews may be kept longer for moderation purposes

### Logs

- System logs are rotated every 30 days
- No user-identifying information in logs
- Error logs are kept for debugging only

## International Users

RYC is designed to respect privacy regardless of location. While we implement practices that align with privacy regulations like GDPR and CCPA, the nature of our anonymous system means most of these regulations' requirements don't apply (since we don't collect personal data).

## Children's Privacy

RYC is intended for college students (typically 18+). We do not knowingly collect information from anyone under 13. If you believe someone under 13 has submitted a review, please contact us.

## Changes to This Policy

We may update this privacy policy to reflect:
- Changes in our practices
- Regulatory requirements
- User feedback
- New features

When we make changes:
- We update the "Last Updated" date
- Significant changes are announced on the site
- The policy is always available at `/privacy`

## Transparency

We believe in complete transparency about our privacy practices:
- This policy is written in plain language
- Our source code is open source (check our GitHub)
- You can audit our practices
- We welcome privacy-related questions

## Contact Us

Questions about privacy?
- GitHub Issues: [Report privacy concerns](https://github.com/Lord-Melflam/RYC/issues)
- Review the code: [GitHub Repository](https://github.com/Lord-Melflam/RYC)

## Technical Details

### Anonymous ID Generation

```javascript
// Cryptographically secure random ID
anonymousId = 'anon_' + crypto.randomBytes(16).toString('hex')
```

This generates a unique identifier that:
- Cannot be traced back to the user
- Cannot be predicted or guessed
- Is different for each review
- Uses cryptographically secure randomness

### Data Minimization Example

Instead of storing:
```javascript
{
  userId: "user123",
  email: "student@university.edu",
  name: "John Doe",
  ipAddress: "192.168.1.1",
  deviceId: "device456",
  ...
}
```

We only store:
```javascript
{
  anonymousId: "anon_3f9e8c7b2d1a5f8e",
  courseId: "course_cs101",
  rating: 5,
  difficulty: 3,
  workload: 4,
  comment: "Great course!",
  semester: "Fall",
  year: 2023
}
```

## Summary

**RYC's Privacy Promise:**

1. ✅ Complete anonymity - no accounts, no tracking
2. ✅ Minimal data collection - only what's needed for reviews
3. ✅ Secure infrastructure - encryption and best practices
4. ✅ Transparent operations - open source, clear policies
5. ✅ User control - flag system, public data
6. ✅ No third-party tracking - no analytics or ads

**Your privacy is not negotiable. It's the foundation of RYC.**

---

Questions? Concerns? Feedback? We're here to listen and improve.
