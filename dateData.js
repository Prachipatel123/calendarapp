var today = new Date();
var day = "";
var dailyMsg = "";


switch (today.getDay()) {
  case 0:
    day = "Sunday";
    dailyMsg = "It's a Holiday!";
    break;
  case 1:
    day = "Monday";
    dailyMsg = "New week has started";
    break;
  case 2:
    day = "Tuesday";
    dailyMsg = "I have lots of work this week";
    break;
  case 3:
    day = "Wednesday";
    dailyMsg = "So much work left for this week";
    break;
  case 4:
    day = "Thursday";
    dailyMsg = "I'm too tired, but the weekend is coming";
    break;
  case 5:
    day = "Friday";
    dailyMsg = "Thank god it's Friday";
    break;
  case 6:
    day = "Saturday";
    dailyMsg = "Finally a break!";
    break;
}

module.exports =
{
  //key-value pairs
  day: day, dailyMsg: dailyMsg
};
