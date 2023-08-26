import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const { age, skill, time, language } = req.body;
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: generatePrompt(age, skill, time, language),
    temperature: 0.6,
    max_tokens: 2048,
  });
  const answer = completion.data.choices[0].text;

  const completionTwo = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: generatePromptTwo(answer),
    temperature: 0.6,
    max_tokens: 2048,
  });
  const answerTwo = completionTwo.data.choices[0].text;

  const completionThree = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: generatePromptThree(answer),
    temperature: 0.6,
    max_tokens: 2048,
  });
  const answerThree = completionThree.data.choices[0].text;

  res
    .status(200)
    .json({ result: answer, resultTwo: answerTwo, resultThree: answerThree });
}

function generatePrompt(age, skill, time, language) {
  return `Suggest one coding portfolio project a ${age}, ${skill} programmer can complete using the ${language} programming and in ${time}. Just respond with the title of the project `;
}

function generatePromptTwo(answer) {
  return `Give a step by step guide on how to make a ${answer}`;
}

function generatePromptThree(answer) {
  return `Give several examples of ${answer} sites or apps with links`;
}
