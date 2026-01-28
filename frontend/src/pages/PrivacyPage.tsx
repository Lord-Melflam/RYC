export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: '800px' }}>
      <h2>Privacy Policy</h2>
      
      <section style={{ marginBottom: '2rem' }}>
        <h3>Anonymous Reviews</h3>
        <p>
          RYC is built with privacy as a core principle. We believe that honest feedback
          requires anonymity. All reviews are submitted anonymously with no user accounts
          or personally identifiable information collected.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3>What We Don't Collect</h3>
        <ul>
          <li>No email addresses</li>
          <li>No names or student IDs</li>
          <li>No account creation required</li>
          <li>No tracking cookies beyond essential functionality</li>
          <li>No IP address logging for reviews</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3>What We Do Collect</h3>
        <ul>
          <li>Course reviews (rating, difficulty, workload, optional comments)</li>
          <li>Anonymous identifiers to prevent spam (not linked to you)</li>
          <li>Basic analytics for service improvement (aggregated, non-identifying)</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3>Moderation</h3>
        <p>
          To maintain quality and prevent abuse, all reviews go through a moderation
          process. Reviews are checked for:
        </p>
        <ul>
          <li>Offensive or inappropriate content</li>
          <li>Spam or promotional material</li>
          <li>Personal attacks against instructors or students</li>
          <li>Plagiarism or duplicate content</li>
        </ul>
        <p>
          See our <a href="/moderation">Moderation Guidelines</a> for more information.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3>Data Retention</h3>
        <p>
          Reviews are stored indefinitely to help future students make informed decisions.
          However, reviews can be flagged and removed if they violate our guidelines.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3>Your Rights</h3>
        <p>
          Since we don't collect personal information, there's no personal data to request
          or delete. If you have concerns about a specific review, you can flag it for
          moderation review.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3>Changes to This Policy</h3>
        <p>
          We may update this privacy policy from time to time. Any changes will be posted
          on this page with an updated revision date.
        </p>
      </section>

      <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)' }}>
        Last updated: January 2024
      </p>
    </div>
  );
}
