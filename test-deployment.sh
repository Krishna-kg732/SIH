#!/bin/bash
# Test script to verify Docker deployment

echo "🧪 Testing Kolam Application Deployment..."

# Function to test endpoint
test_endpoint() {
    local url=$1
    local name=$2
    local timeout=${3:-10}
    
    echo -n "Testing $name ($url)... "
    
    if curl -f -s --max-time $timeout "$url" > /dev/null; then
        echo "✅ OK"
        return 0
    else
        echo "❌ FAILED"
        return 1
    fi
}

# Wait for services to be ready
echo "⏳ Waiting for services to start (30 seconds)..."
sleep 30

# Test core endpoints
failed=0

test_endpoint "http://localhost:80" "Frontend" || ((failed++))
test_endpoint "http://localhost:80/health" "Health Check" || ((failed++))
test_endpoint "http://localhost:8000" "Backend API" || ((failed++))
test_endpoint "http://localhost:8000/docs" "API Documentation" || ((failed++))

# Test database connection
echo -n "Testing database connection... "
if docker-compose exec -T postgres pg_isready -U kolam_user -d kolam_db > /dev/null 2>&1; then
    echo "✅ OK"
else
    echo "❌ FAILED"
    ((failed++))
fi

# Test optional services
test_endpoint "http://localhost:9200" "OpenSearch" 30 || echo "⚠️  OpenSearch not ready (this is optional)"
test_endpoint "http://localhost:3000" "Grafana" 30 || echo "⚠️  Grafana not ready (this is optional)"

# Final result
echo ""
if [ $failed -eq 0 ]; then
    echo "🎉 All core services are working!"
    echo ""
    echo "🌐 Access your application:"
    echo "   Frontend: http://localhost"
    echo "   Backend API: http://localhost:8000"
    echo "   API Docs: http://localhost:8000/docs"
    echo ""
else
    echo "❌ $failed core service(s) failed. Check logs with: docker-compose logs"
    exit 1
fi