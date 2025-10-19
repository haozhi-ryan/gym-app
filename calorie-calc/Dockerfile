FROM python:3.12-slim

LABEL name="Calculator Service"

WORKDIR /calculator-app

COPY requirements.txt .

# Install deps
RUN pip install --no-cache-dir -r requirements.txt

# Copy app
COPY . .

WORKDIR /calculator-app/app

EXPOSE 8001

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001", "--reload"]

