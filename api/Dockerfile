
FROM python:3.11-slim
# Set the working directory in the container
WORKDIR /embs_apis
ADD . /embs_apis_app
# RUN chown -R 1001:1001 /pangea_agent
VOLUME /embs_apis_app
# Copy the requirements file into the container
COPY requirements.txt .
# Install any dependencies
RUN pip install -r requirements.txt
# Copy all the application code into the container
COPY . .
EXPOSE 8000
CMD ["uvicorn", "app:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "8000"]