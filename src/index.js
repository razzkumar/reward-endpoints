const express = require("express");

const { getRewards, redeemRewards } = require("./services");

const app = express();

const port = process.env.PORT || 4000;

// Health check endpoint
app.get("/health", (_, res) => {
  res.status(200).send("ok");
});

// Get rewards endpoint
// /users/1/rewards?at=2020-03-19T12:00:00Z
app.get("/users/:id/rewards", async (req, res) => {
  const id = req.params.id;
  const at = req.query.at;

  try {
    if (!id || !at) {
      res.status(400).send("Bad request");
      return;
    }

    const date = new Date(at);

    if (isNaN(date.getTime())) {
      res.status(400).send("please pass the valid date");
    }

    // Get rewards for user id
    const rewards = await getRewards(id, date);

    return res.status(200).send(rewards);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Redeem rewards
// /users/1/rewards/2020-03-18T00:00:00Z/redeem
app.patch("/users/:id/rewards/:at/redeem", async (req, res) => {
  const id = req.params.id;
  const at = req.params.at;

  const redeem = await redeemRewards(id, new Date(at));

  if (redeem) {
    return res.status(200).send(redeem);
  }

  return res
    .status(400)
    .send({ error: { message: "This reward is already expired" } });
});

app.listen(port, () => {
  console.log(`Reward app listening on port ${port}`);
});
