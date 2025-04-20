#!/bin/bash

CERT_DIR="./ssl"
KEY_FILE="$CERT_DIR/key.pem"
CERT_FILE="$CERT_DIR/cert.pem"

mkdir -p "$CERT_DIR"

openssl req -x509 -nodes -days 365 \
  -newkey rsa:2048 \
  -keyout "$KEY_FILE" \
  -out "$CERT_FILE" \
  -subj "/C=US/ST=Test/L=Dev/O=Dev/CN=localhost"

echo "✅ Self-signed certificate generated:"
echo "🔑 Private Key: $KEY_FILE"
echo "📄 Certificate: $CERT_FILE"
