package com.keus.capacitor.bleplugin;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothManager;
import android.bluetooth.le.BluetoothLeScanner;
import android.bluetooth.le.ScanCallback;
import android.bluetooth.le.ScanResult;
import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import java.util.ArrayList;
import java.util.List;

public class BLEScanner {

    private static final String TAG = "BLEScanner";
    private BluetoothAdapter bluetoothAdapter;
    private BluetoothLeScanner bluetoothLeScanner;
    private ScanCallback leScanCallback;
    private boolean scanning;
    private Handler handler;
    private List<BluetoothDevice> leDevices;

    // Stops scanning after 10 seconds.
    private static final long SCAN_PERIOD = 10000;

    public BLEScanner(Context context) {
        BluetoothManager bluetoothManager = (BluetoothManager) context.getSystemService(Context.BLUETOOTH_SERVICE);
        bluetoothAdapter = bluetoothManager.getAdapter();
        bluetoothLeScanner = bluetoothAdapter.getBluetoothLeScanner();
        leDevices = new ArrayList<>();
        handler = new Handler(Looper.getMainLooper());
    }

    public void startScan() {
        if (scanning) {
            return;
        }
        leDevices.clear();
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                stopScan();
            }
        }, SCAN_PERIOD);

        leScanCallback = new ScanCallback() {
            @Override
            public void onScanResult(int callbackType, ScanResult result) {
                BluetoothDevice device = result.getDevice();
                if (!leDevices.contains(device)) {
                    leDevices.add(device);
                    Log.d(TAG, "Found device: " + device.getName() + " (" + device.getAddress() + ")");
                }
            }

            @Override
            public void onBatchScanResults(List<ScanResult> results) {
                for (ScanResult result : results) {
                    BluetoothDevice device = result.getDevice();
                    if (!leDevices.contains(device)) {
                        leDevices.add(device);
                        Log.d(TAG, "Found device: " + device.getName() + " (" + device.getAddress() + ")");
                    }
                }
            }

            @Override
            public void onScanFailed(int errorCode) {
                Log.e(TAG, "Scan failed with error: " + errorCode);
            }
        };

        bluetoothLeScanner.startScan(leScanCallback);
        scanning = true;
        Log.d(TAG, "Scanning started");
    }

    public void stopScan() {
        if (!scanning) {
            return;
        }
        bluetoothLeScanner.stopScan(leScanCallback);
        scanning = false;
        Log.d(TAG, "Scanning stopped");
    }

    public List<BluetoothDevice> getLeDevices() {
        return leDevices;
    }

    public boolean isScanning() {
        return scanning;
    }
}
