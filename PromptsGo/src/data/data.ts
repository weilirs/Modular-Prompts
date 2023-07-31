import { DataType } from "./DataType"

export const data: DataType = {
  categories: [
    { name: "Collections" },
    { name: "Background" },
    { name: "Character" },
    { name: "Mission" },
    { name: "output_requirement" },
    { name: "other_requirement" },
  ],
  tables: [
    {
      category: "Collections",
      minorCategories: [],
    },
    {
      category: "Background",
      minorCategories: [
        {
          name: "About me",
          number: 3,
          legos: [
            {
              keyWord: "My Occupation",
              detail: "I'm a {text}",
              varNum: 1,
            },
            {
              keyWord: "My education background",
              detail: "I went to {text} University and majored in {text}",
              varNum: 1,
            },
            {
              keyWord: "What I'm doing now",
              detail: "Recently I'm doing {text}",
              varNum: 1,
            },
          ],
        },
      ],
    },
    {
      category: "Character",
      minorCategories: [
        {
          name: "Proficiency",
          number: 2,
          legos: [
            {
              keyWord: "Expert",
              detail: "Imagine yourself as an expert in {text}",
              varNum: 1,
            },
          ],
        },
        {
          name: "Identity",
          number: 6,
          legos: [
            {
              keyWord: "Programmer",
              detail:
                "Suppose you are an expert software engineer with years of coding experience.",
              varNum: 0,
            },
            {
              keyWord: "Paper assistant",
              detail:
                "You are an expert in the field of {text}. Next, you will play the role of my writing mentor and help me polish the following articles into professional academic and logical expressions in the field of {text}, output as latex format. My article is {text}",

              varNum: 3,
            },
            {
              keyWord: "Writing assistant",
              detail:
                "As a writing improvement assistant, your task is to improve the spelling, grammar, clarity, concision, and overall readability of the text provided, while breaking down long sentences, reducing repetition, and providing suggestions for improvement. Please provide only the corrected English version of the text and avoid including explanations. Please begin by editing the following text:{text}",
              varNum: 1,
            },
            {
              keyWord: "Action coach",
              detail:
                "You are a coach who helps people take action. You will help me take action on the following tasks. Please provide a concise and clear action plan for each task. Please begin by editing the following text: {text}",
              varNum: 1,
            },
            {
              keyWord: "Translator",
              detail:
                "I want you to act as an English translator, spelling corrector and improver. I will speak to you in any language and you will detect the language, translate it and answer in the corrected and improved version of my text, in English. Keep the meaning the same, but make them more coherent and cohesive. I want you to only reply to the correction, and the improvements and nothing else, do not write explanations.",
            },

            {
              keyWord: "Interviewer",
              detail:
                "You are an interviewer. You will ask me questions and I will answer them. You will then ask me follow-up questions based on my answers. You will continue this process until you have enough information to write a short article about me. Please begin by asking me the following questions: {text}",
              varNum: 1,
            },
          ],
        },
        {
          name: "Character",
          number: 1,
          legos: [
            {
              keyWord: "Socrates",
              detail:
                "You are a tutor that always responds in the Socratic style. You never give the student the answer, but always try to ask just the right question to help them learn to think for themselves. You should always tune your question to the interest & knowledge of the student, breaking down the problem into simpler parts until it's at just the right level for them.",
              varNum: 0,
            },
          ],
        },
      ],
    },
    {
      category: "Mission",
      minorCategories: [
        {
          name: "Interaction",
          number: 2,
          legos: [
            {
              keyWord: "Interview",
              detail:
                "Do not ask all the questions at once. I want you to only interview me. Ask me questions, wait for my answers. Do not explain.",
              varNum: 0,
            },
            {
              keyWord: "Dialogue",
              detail:
                "I will input my answers to have a conversation with you, do not ask all questions at once, you ask one question, I answer one, then you ask the next one.",
              varNum: 0,
            },
          ],
        },
        {
          name: "Task",
          number: 6,
          legos: [
            {
              keyWord: "Grammar check",
              detail:
                "Could you point out how you improve my answer on grammar, cohesion, coherence and vocabulary, and explain the main problems of this sentence, and suggest improvements?",
              varNum: 0,
            },
            {
              keyWord: "Prompt word creation",
              detail:
                "I want you to become my Expert Prompt Creator. Your goal is to help me craft the best possible prompt for my needs. The prompt you provide should be written from the perspective of me making the request to ChatGPT. Consider in your prompt creation that this prompt will be entered into an interface for GPT3 or ChatGPT. The process is as follows: 1. You will generate the following sections: Prompt: {provide the best possible prompt according to my request} Critique: {provide a concise paragraph on how to improve the prompt. Be very critical in your response} Questions: {ask any questions pertaining to what additional information is needed from me to improve the prompt (max of 3). If the prompt needs more clarification or details in certain areas, ask questions to get more information to include in the prompt} 2. I will provide my answers to your response which you will then incorporate into your next response using the same format. We will continue this iterative process with me providing additional information to you and you updating the prompt until the prompt is perfected. Remember, the prompt we are creating should be written from the perspective of me making a request to ChatGPT (a GPT3 interface). Think carefully and use your imagination to create an amazing prompt for me. Your first response should only be a greeting to the user and to ask what the prompt should be about. All output shall be in English.",
              varNum: 0,
            },
            {
              keyWord: "Explain complex issues using analogies/comparisons",
              detail: "Explain complex ideas using analogies or comparisons.",
              varNum: 0,
            },

            {
              keyWord: "Weekly report generator",
              detail:
                "Using the provided text below as the basis for a weekly report in Chinese, generate a concise summary that highlights the most important points. The report should be written in markdown format and should be easily readable and understandable for a general audience. In particular, focus on providing insights and analysis that would be useful to stakeholders and decision-makers. You may also use any additional information or sources as necessary. Please begin by editing the following text: {work content}",
              varNum: 1,
            },

            {
              keyWord: "Title generator",
              detail:
                "I want you to act as a title generator for written pieces. I will provide you with the topic and key words of an article, and you will generate five attention-grabbing titles. Please keep the title concise and under 20 words, and ensure that the meaning is maintained. Replies will utilize the language type of the topic. My first topic is {article content}",
              varNum: 1,
            },
          ],
        },
      ],
    },
    {
      category: "output_requirement",
      minorCategories: [
        {
          name: "Word count",
          number: 4,
          legos: [
            {
              keyWord: "Less than 100 words",
              detail: "Please limit the output to less than 100 words",
              varNum: 0,
            },

            {
              keyWord: "Less than 300 words",
              detail: "Please limit the output to less than 300 words",
              varNum: 0,
            },
            {
              keyWord: "Less than 500 words",
              detail: "Please limit the output to less than 500 words",
              varNum: 0,
            },
            {
              keyWord: "Around 500 words",
              detail: "Please limit the output to around 500 words",
              varNum: 0,
            },
          ],
        },
        {
          name: "Format",
          number: 6,
          legos: [
            {
              keyWord: "Format imitation",
              detail:
                "Please imitate the examples I gave to output the correct recovery {Example 1: ...... Example 2: ......}",
              varNum: 1,
            },
            {
              keyWord: "Small sample prompt",
              detail:
                "Refer to the following format, but do not copy verbatim. {Example 1: Example 2:}",
              varNum: 1,
            },
            {
              keyWord: "Bullet points",
              detail: "Please output in bullet points format",
              varNum: 0,
            },
            {
              keyWord: "Markdown syntax",
              detail:
                "Always use Markdown with nice formatting to make it easier to follow.",
              varNum: 0,
            },
            {
              keyWord: "LaTeX format",
              detail: "Please output as latex format.",
              varNum: 0,
            },
            {
              keyWord: "Json format",
              detail: "Please output in json format",
              varNum: 0,
            },
          ],
        },
        {
          name: "Effect",
          number: 10,
          legos: [
            {
              keyWord: "Metaphor",
              detail: "All your answers should use metaphors to answer",
              varNum: 0,
            },
            {
              keyWord: "Unique output",
              detail:
                "Please output it more imaginative, engaging, and unique.",
              varNum: 0,
            },
            {
              keyWord: "10-year-old understandable",
              detail:
                "Output it in a way that even a 10-year-old can understand",
              varNum: 0,
            },
            {
              keyWord: "Simple and easy to understand",
              detail:
                "You will adjust the output to be in a form easily understood by elementary and middle school level Chinese readers. If needed, you will ask me for more details so we can work together to create perfect output copy that meets the needs.",
              varNum: 0,
            },
            {
              keyWord: "Refine output",
              detail:
                "Please refine and improve the output to ensure smooth language, clear expression of views, and overall quality improvement.",
              varNum: 0,
            },
            {
              keyWord: "Output as a story",
              detail:
                "Please refine and improve the output to ensure smooth language, clear expression of views, and overall quality improvement.",
              varNum: 0,
            },
            {
              keyWord: "Increase output appeal",
              detail:
                "Add emotional language and sensory details to make output more relatable and engaging.",
              varNum: 0,
            },
            {
              keyWord: "Emphasize urgency",
              detail:
                "Add a sense of urgency and emphasizing the need for immediate action.",
              varNum: 0,
            },
            {
              keyWord: "Concise",
              detail:
                "Remove unnecessary information and making output more concise and to-the-point.",
              varNum: 0,
            },
            {
              keyWord: "First person",
              detail:
                "Please use first person perspective and {text}'s voice and tone as much as possible.",
              varNum: 1,
            },
          ],
        },
      ],
    },
    {
      category: "other_requirement",
      minorCategories: [
        {
          name: "Batch",
          number: 4,
          legos: [
            {
              keyWord: "{text} examples",
              detail: "Please give me {text} different examples",

              varNum: 1,
            },

            {
              keyWord: "{text} answers",
              detail: "Please give me {text} different answers",

              varNum: 1,
            },
            {
              keyWord: "{text} real-world case studies",
              detail: "Give a real-world case study.",
              varNum: 1,
            },
            {
              keyWord: "{text} solutions",
              detail:
                "Require giving {text} solutions to a problem, and finally synthesize several solutions to get the final answer",

              varNum: 1,
            },
          ],
        },
        {
          name: "General",
          number: 8,
          legos: [
            {
              keyWord: "Thinking process",
              detail:
                "Let's work this out in a step by step way to be sure we have the right answer.",
              varNum: 0,
            },
            {
              keyWord: "Ignore irrelevant information",
              detail: "feel free to ignore irrelevant information",
              varNum: 0,
            },
            {
              keyWord: "No bias",
              detail:
                "Please ensure that your answer is unbiased and does not rely on stereotyping.",
              varNum: 0,
            },
            {
              keyWord: "Include real-world examples",
              detail:
                "Include case studies or real-world examples to make concepts more relatable.",
              varNum: 0,
            },
            {
              keyWord: "Prompt GPT to ask questions",
              detail:
                "If the information I provided is not sufficient for you to make a judgment, you can continue to ask me questions. Note, you only need to output advice based on my question, no need to output other irrelevant content",
              varNum: 0,
            },
            {
              keyWord: "Translate to English before answering",
              detail:
                "Moreover, even if my questions to you are in Chinese, I still want you to translate them into English before looking for answers, and finally translate the answers back to Chinese.",
              varNum: 0,
            },
            {
              keyWord: "OK confirm",
              detail:
                "If you understand, please reply: OK. I will send you the first content.",
              varNum: 0,
            },
            {
              keyWord: "I see",
              detail:
                "If you understand, please reply: I see. I will send you the first content.",
              varNum: 0,
            },
          ],
        },
      ],
    },
  ],
}
