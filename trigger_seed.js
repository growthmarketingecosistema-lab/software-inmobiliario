fetch('http://localhost:3004/api/seed', { method: 'POST' })
  .then(res => res.json())
  .then(data => {
    console.log("SEED_RESULT:", data);
    process.exit(0);
  })
  .catch(err => {
    console.error("SEED_ERROR:", err.message);
    process.exit(1);
  });
