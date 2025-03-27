from google import genai
from google.genai import types
import os as OS
import dotenv

dotenv.load_dotenv()

client = genai.Client(api_key=OS.environ['GOOGLE_API_KEY'])

for model_info in client.models.list():
    print(model_info.name)

# create tuning model
training_dataset =  [
    ["1", "2"],
    ["3", "4"],
    ["-3", "-2"],
    ["twenty two", "twenty three"],
    ["two hundred", "two hundred one"],
    ["ninety nine", "one hundred"],
    ["8", "9"],
    ["-98", "-97"],
    ["1,000", "1,001"],
    ["10,100,000", "10,100,001"],
    ["thirteen", "fourteen"],
    ["eighty", "eighty one"],
    ["one", "two"],
    ["three", "four"],
    ["seven", "eight"],
]
training_dataset=types.TuningDataset(
        examples=[
            types.TuningExample(
                text_input=i,
                output=o,
            )
            for i,o in training_dataset
        ],
    )
tuning_job = client.tunings.tune(
    base_model='models/gemini-1.5-flash-001-tuning',
    training_dataset=training_dataset,
    config=types.CreateTuningJobConfig(
        epoch_count= 5,
        batch_size=4,
        learning_rate=0.001,
        tuned_model_display_name="test tuned model"
    )
)

# Wait for the tuning job to complete
tuned_model = None
while not tuned_model:
    tuning_job = client.tunings.get(name=tuning_job.name)
    if tuning_job.state == "SUCCEEDED":
        tuned_model = tuning_job.tuned_model
    elif tuning_job.state == "FAILED":
        raise RuntimeError("Tuning job failed. Please check the logs.")
    else:
        print("Tuning job is still in progress. Waiting...")
        import time
        time.sleep(10)

# Generate content with the tuned model
if tuned_model:
    response = client.models.generate_content(
        model=tuned_model.model,
        contents='III',
    )
    print(response.text)
else:
    raise RuntimeError("Tuned model is not available.")

print(response.text)