# setup directories
mkdir -p ./src/generated
mkdir -p ./dist/generated

echo "Running node client protogen"

# generate js codes
./node_modules/.bin/grpc_tools_node_protoc \
--js_out=import_style=commonjs,binary:./src/generated \
--grpc_out=./src/generated \
--plugin=protoc-gen-grpc=./node_modules/.bin/grpc_tools_node_protoc_plugin \
-I ../proto \
../proto/*.proto

# generate d.ts codes
protoc \
--plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
--ts_out=./src/generated \
-I ../proto \
../proto/*.proto