

import * as Types from './types';
import State from './state';
import {useState, useEffect} from 'react';
import DEFAULT_CONFIGURATION from './defaultConfiguration';

// Stores the currently used configuration
let _configuration: Types.NetInfoConfiguration = DEFAULT_CONFIGURATION;

let _state: State | null = null;
const createState = (): State => {
    return new State(_configuration);
};

export function configure(
    configuration: Partial<Types.NetInfoConfiguration>,
): void {
    _configuration = {
        ...DEFAULT_CONFIGURATION,
        ...configuration,
    };

    if (_state) {
        _state.tearDown();
        _state = createState();
    }
}

export function fetch(
    requestedInterface?: string,
): Promise<Types.NetInfoState> {
    if (!_state) {
        _state = createState();
    }
    return _state.latest(requestedInterface);
}

export function addEventListener(
    listener: Types.NetInfoChangeHandler,
): Types.NetInfoSubscription {
    if (!_state) {
        _state = createState();
    }

    _state.add(listener);
    return (): void => {
        _state && _state.remove(listener);
    };
}

/**
 * A React Hook which updates when the connection state changes.
 *
 * @returns The connection state.
 */
export function useNetInfo(
    configuration?: Partial<Types.NetInfoConfiguration>,
): Types.NetInfoState {
    if (configuration) {
        configure(configuration);
    }

    const [netInfo, setNetInfo] = useState<Types.NetInfoState>({
        type: Types.NetInfoStateType.unknown,
        isConnected: false,
        isInternetReachable: false,
        details: null,
    });

    useEffect((): (() => void) => {
        return addEventListener(setNetInfo);
    }, []);

    return netInfo;
}

export * from './types';

export default {
    configure,
    fetch,
    addEventListener,
    useNetInfo,
};
