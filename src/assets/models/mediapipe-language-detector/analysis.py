import tensorflow as tf
import numpy as np

# Load the TFLite model
interpreter = tf.lite.Interpreter(model_path="model.tflite")

# Allocate memory for tensors
interpreter.allocate_tensors()

# Get input and output tensors
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

print("Model Loaded Successfully!")
print(f"Input Details: {input_details}")
print(f"Output Details: {output_details}")

# Create a random input matching the input shape
input_shape = input_details[0]['shape']
random_input = np.random.rand(*input_shape).astype(np.float32)

# Run inference
interpreter.set_tensor(input_details[0]['index'], random_input)
interpreter.invoke()

# Get the output
output_data = interpreter.get_tensor(output_details[0]['index'])
print("Model Output:", output_data)
