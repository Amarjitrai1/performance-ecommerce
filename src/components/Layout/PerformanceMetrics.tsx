import React from 'react';
import { Zap, TrendingUp, Package, Clock } from 'lucide-react';
import { formatBytes } from '../../utils/performanceUtils';

interface PerformanceMetricsProps {
  totalProducts: number;
  filteredProducts: number;
  filterTime: number;
  renderTime: number;
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({
  totalProducts,
  filteredProducts,
  filterTime,
  renderTime
}) => {
  const memoryUsage = (performance as any).memory?.usedJSHeapSize;
  const formattedMemory = memoryUsage ? formatBytes(memoryUsage) : 'N/A';

  return (
    <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4 mb-6 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Zap className="h-5 w-5" />
          <h3 className="font-semibold">Performance Metrics</h3>
        </div>
        <div className="text-xs text-white/80">
          Real-time updates on search/filter
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
          <div className="flex items-center text-sm mb-1">
            <Package className="h-4 w-4 mr-1" />
            <span>Total Products</span>
          </div>
          <p className="text-lg font-bold">{totalProducts.toLocaleString()}</p>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
          <div className="flex items-center text-sm mb-1">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>Filtered</span>
          </div>
          <p className="text-lg font-bold">{filteredProducts.toLocaleString()}</p>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
          <div className="flex items-center text-sm mb-1">
            <Clock className="h-4 w-4 mr-1" />
            <span>Filter Time</span>
          </div>
          <p className="text-lg font-bold">{filterTime.toFixed(2)}ms</p>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
          <div className="flex items-center text-sm mb-1">
            <Zap className="h-4 w-4 mr-1" />
            <span>Render Time</span>
          </div>
          <p className="text-lg font-bold">{renderTime.toFixed(2)}ms</p>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
          <div className="flex items-center text-sm mb-1">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>Memory</span>
          </div>
          <p className="text-lg font-bold">{formattedMemory}</p>
        </div>
      </div>
    </div>
  );
};