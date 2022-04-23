const { getFirstAndLastDayOfWeek } = require("./utils/date");
const { writeJsonFile, readJsonFile } = require("./utils/files");

/**
 * Function that generate rewards and store in json file.
 * @constructor
 * @param {string} userID - user id
 * @param {string} date - Requested date.
 */

async function getRewards(userID, date) {
  try {
    // Reading all the data from the json file
    const data = await readJsonFile();

    const [start, end] = getFirstAndLastDayOfWeek(new Date(date));

    // Get current user data
    const currentUserData = data?.find(
      (item) => item.userID.toString() === userID.toString()
    );

    // filter data with date and get one weeks data
    const filteredData = currentUserData?.rewards?.filter((item) => {
      return (
        new Date(item.availableAt) >= start && new Date(item.availableAt) <= end
      );
    });

    if (filteredData && filteredData.length) {
      console.info(`[SERVICE] Sending Saved Rewards`);
      return filteredData;
    }

    // Generate new rewards
    const generatedData = Array.from({ length: 7 }).map((_, index) => {
      const startDate = new Date(start);
      const dayOfTheMonth = startDate.getDate();
      return {
        availableAt: new Date(startDate.setDate(dayOfTheMonth + index)),
        redeemedAt: null,
        expiresAt: new Date(startDate.setDate(dayOfTheMonth + index + 1)),
      };
    });

    if (currentUserData?.rewards?.length) {
      const newData = new Set([...currentUserData.rewards, ...generatedData]);
      currentUserData.rewards = [...newData];
    }

    // If exists update the data else create new data
    const newData = currentUserData?.rewards?.length
      ? data.map((item) => {
          if (item.userID.toString() === userID.toString()) {
            return currentUserData;
          }
          return item;
        })
      : [...data, { userID, rewards: generatedData }];

    // Writing the new data to the json file
    await writeJsonFile(newData);

    console.info(`[SERVICE] Sending Generated Date`);
    return generatedData;
  } catch (error) {
    console.error(`[GET REWARD] ${error}`);
  }
}

/**
 * Function that helps to update reward redeem date and return rewards and it's status
 * @constructor
 * @param {string} userID - user id
 * @param {string} date - Requested date.
 */

async function redeemRewards(userID, date) {
  try {
    // Reading all the data from the json file
    const data = await readJsonFile();

    // filter data with date and get one weeks data
    const currentUserData = data?.find(
      (item) => item.userID.toString() === userID.toString()
    );

    const redeemedData = currentUserData?.rewards?.find((item) => {
      return new Date(item.availableAt).getTime() === date.getTime();
    });

    if (redeemedData && !redeemedData.redeemedAt) {
      redeemedData.redeemedAt = new Date();

      // Update Current user data
      currentUserData.rewards = currentUserData.rewards.map((item) =>
        new Date(item.availableAt) === new Date(date) ? redeemedData : item
      );

      // Create new date if not exist
      // OR Update old data if user's already stored

      const newData = currentUserData?.rewards?.length
        ? data.map((item) => {
            if (item.userID.toString() === userID.toString()) {
              return currentUserData;
            }
            return item;
          })
        : [...data, { userID, rewards: generatedData }];

      await writeJsonFile(newData);

      return redeemedData;
    }

    return null;
  } catch (error) {
    console.error(`[GET REWARD] ${error}`);
  }
}

module.exports = {
  getRewards,
  redeemRewards,
};
